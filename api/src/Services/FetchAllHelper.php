<?php

namespace App\Services;

// Services
use App\Services\UtilsHelper;

use PDO;

class FetchAllHelper
{
    public static function formatJoin(array $params, string $table, array $avoid = [], array $include_values = [])
    {
        foreach ($params as $key => $column) {
            if ($key == "order_by") {
                $params[$key] = $table . "." . $column;
            }

            if ($key != "page" && $key != "limit" && $key != "order" && $key != "order_by" && $key != "search_pattern" && $key != "start_at" && $key != "end_at") {
                if (!array_key_exists($key, $avoid)) {
                    $params[$table . "." . $key] = $column;
                } else {
                    $params[$avoid[$key]] = $column;
                }
                unset($params[$key]);
            }
        }

        foreach ($include_values as $key => $value) {
            $params[$key] = $value;
        }

        return $params;
    }
    
    public static function convertToType($value, $type)
    {
        switch ($type) {
            case 'int':
                return intval($value);
            case 'bool':
                return json_encode(filter_var($value, FILTER_VALIDATE_BOOLEAN));
            default:
                return $value;
        }
    }

    public static function getPagination($queryParams)
    {
        if (!isset($queryParams["page"]) || (int)$queryParams["page"] == 0) {
            //Limita automaticamente los registros a 1k si no se pasa la pagina (ignora la paginación pero por rendimiento se limitan a 1k)
            return (object)[
                "limit" => 1000,
                "offset" => 0,
                "disabled" => true
            ];
        }

        $page = (int)$queryParams["page"];
        $limit = 30;

        if (isset($queryParams["limit"]) && (int)$queryParams["limit"] > 0) {
            $limit = (int)$queryParams["limit"];
        }

        return (object)[
            "page" => $page,
            "limit" => $limit,
            "offset" => ($page - 1) * $limit
        ];
    }


    public static function getOrderBy($queryParams, $allowed_columns, $default = null)
    {
        if (!is_array($allowed_columns) || count($allowed_columns) == 0) {
            return (object)[
                "order_by" => isset($default) ? $default : "dateCreated",
                "order" => "desc",
            ];
        }

        if (!isset($queryParams["order_by"]) || !in_array(strtolower(trim($queryParams["order_by"])), $allowed_columns)) {
            return (object)[
                "order_by" => isset($default) ? $default : "dateCreated",
                "order" => "desc",
            ];
        }

        $order_by = strtolower(trim($queryParams["order_by"]));
        $order = "asc";

        if (isset($queryParams["order"]) && (strtolower(trim($queryParams["order"])) == "desc")) {
            $order = "desc";
        }

        return (object)[
            "order_by" => $order_by,
            "order" => $order,
        ];
    }


    public static function getfilters($queryParams, $filter_columns = [], $search_columns = [], $range_date_column = "dateCreated")
    {
        $filters = [];

        //Buscar en los parametros teniendo en cuenta las columnas a filtrar
        foreach ($filter_columns as $column => $type) {
            if (isset($queryParams[$column]) && $queryParams[$column] != "" || str_contains($column, 'disabled')) {

                $filter_decode = json_decode($queryParams[$column]);

                if (is_array($filter_decode) && count($filter_decode) > 0) {
                    $temp_filter = [];

                    foreach ($filter_decode as $key => $f_decode) {
                        $temp_val = self::convertToType($f_decode, $type);

                        if ($type != 'int') {
                            array_push($temp_filter, $temp_val);
                        } else {
                            if ($temp_val > 0) {
                                array_push($temp_filter, $temp_val);
                            }
                        }

                        unset($temp_val);
                    }

                    $filters[$column] = $temp_filter;

                    unset($temp_filter);
                } else {
                    $filters[$column] =  self::convertToType($queryParams[$column], $type);
                }
            }
        }

        //Rango de fechas
        if (isset($queryParams['start_at']) && strtotime($queryParams['start_at'])) {

            //Convierte el valor de los parametros 'start_at' o 'end_at' a Unix timestamp y luego a fecha con el formato 'Y-m-d H:i:s'
            $start_at = date("Y-m-d 00:00:00", strtotime($queryParams['start_at']));
            $end_at = date('Y-m-d 23:59:59');

            if (isset($queryParams['end_at']) && $queryParams['end_at'] != "" && strtotime($queryParams['end_at'])) {
                $end_at = date("Y-m-d 23:59:59", strtotime($queryParams['end_at']));
            }

            $filters["range_date"] = [
                "start_at" => $start_at,
                "end_at" => $end_at,
            ];
        }

        //Busqueda
        if (isset($queryParams['search_pattern']) && $queryParams['search_pattern'] != "") {

            //Verifica que haya minimo un campo con el cual hacer la busqueda
            if (count($search_columns) > 0) {
                $filters["search_pattern"] = [
                    "pattern" => trim($queryParams['search_pattern']),
                    "columns" => $search_columns,
                ];
            }
        }

        if (isset($filters['start_at']) && isset($filters['end_at'])) {
            unset($filters['start_at']);
            unset($filters['end_at']);
        }

        return $filters;
    }

    private static function getJoinsSql(array $configs)
    {

        if (!isset($configs) || count($configs) == 0) {
            return null;
        }

        $joins = "";

        foreach ($configs as $key => $config) {
            if (
                isset($config["local_table"]) &&
                isset($config["local_column"]) &&
                isset($config["referenced_table"]) &&
                isset($config["referenced_column"]) &&
                isset($config["type"])
            ) {
                if (isset($config["distinct"])) {
                    $joins .= " {$config['type']} JOIN {$config['distinct']} {$config['referenced_table']} ON {$config['local_table']}.{$config['local_column']} = {$config['referenced_table']}.{$config['referenced_column']} ";
                } else {
                    $joins .= " {$config['type']} JOIN {$config['referenced_table']} ON {$config['local_table']}.{$config['local_column']} = {$config['referenced_table']}.{$config['referenced_column']} ";
                }
            }
        }

        return $joins;
    }

    public static function fetchAll($table, $columns, $filters, $order_by, $pagination, $pdo, $joins = null, $group_by = null, $fetch_class = null, $unlock_categories = null, $unlock_courses = null)
    {
        $sql = "SELECT " . implode(",", $columns) . " FROM $table ";
        $filters_sql = "";

        //Join
        if (isset($joins)) {
            $joins_sql = self::getJoinsSql($joins);

            if (isset($joins_sql)) {
                $sql .=  $joins_sql;
            }
        }

        $query_row = [];

        //Construcción de la parte de la consulta para filtrar, ya sea por uno o mas campos, busqueda o rango de fechas 
        if (isset($filters) && count($filters) > 0) {
            $filters_sql = " WHERE ";

            if ($unlock_categories !== NULL) {
                $filters_sql .= "unlocks.id_category IS NOT NULL AND ";
            }

            if ($unlock_courses !== NULL) {
                $filters_sql .= "unlocks.id_course IS NOT NULL AND ";
            }

            //El conteo de filtros aplicados determina si se concatena el operador AND
            $filters_count = 0;

            foreach ($filters as $key => $filter) {

                if ($filters_count > 0) {
                    $filters_sql .= " AND ";
                }

                //Filtrado por un campo de la tabla
                if ($key != "range_date" && $key != "search_pattern") {

                    //Decodifica el valor del filtro en busca de un json
                    if (is_array($filter) && count($filter) > 0) {

                        $filters_sql .= "(";

                        $filter_count = 0;

                        foreach ($filter as $k => $filter) {
                            if ($filter_count > 0) {
                                $filters_sql .= " OR ";
                            }

                            $filters_sql .= " $key = '$filter' ";
                            $filter_count++;
                        }

                        unset($filter_count);

                        $filters_sql .= ")";
                    } else {
                        //Toma el valor como string
                        if ($filter === null || strtolower($filter) === 'null') {
                            $filters_sql .= " $key IS NULL ";
                        } else {
                            $filters_sql .= " $key = '$filter' ";
                        }
                    }

                    $filters_count++;
                } else {
                    //Filtra usando el rango de fechas
                    if ($key == "range_date") {

                        $filter_column = $filter["column"] ?? "dateCreated";

                        $filters_sql .= " {$filter_column} BETWEEN '" . $filter["start_at"] . "' AND '" . $filter["end_at"] . "' ";
                        $filters_count++;
                    }

                    //Filtra mediante un patron de busqueda teniendo en cuenta las columnas definidas en el filtro
                    if ($key == "search_pattern") {

                        $pattern = $filter["pattern"];

                        //El conteo de concatenaciones de busqueda determina si se usa el operador OR
                        $search_count = 0;

                        $filters_sql .= "(";

                        foreach ($filter["columns"] as $key => $column) {

                            if ($search_count > 0) {
                                $filters_sql .= " OR ";
                            }

                            //Se convierte el valor de la columna a un string en minuscula para evitar conflictos entre tipos de datos 
                            $filters_sql .= " LOWER($column) LIKE LOWER('%$pattern%') ";
                            $search_count++;
                        }

                        unset($search_count);

                        $filters_sql .= ")";

                        $filters_count++;
                    }
                }
            }

            unset($filters_count);
        }

        //Concatena los filtros que haya detectado
        $sql .= $filters_sql;

        if (isset($group_by) && is_array($group_by) && count($group_by) > 0) {
            $sql .= " GROUP BY " .  implode(",", $group_by);
        }

        if (isset($order_by)) {
            $sql .= " ORDER BY  $order_by->order_by $order_by->order";
        }

        if (isset($pagination)) {

            $total_query = "SELECT COUNT(*) as count FROM $table ";

            //Join
            if (isset($joins_sql)) {
                $total_query .=  $joins_sql;
            }

            $total_query .= $filters_sql;

            //Se obtiene el total de registros en la tabla que coinciden con los filtros
            $total = $pdo->query($total_query)->fetch(PDO::FETCH_ASSOC)["count"];

            $sql .= " LIMIT :limit OFFSET :offset";

            $query_row["limit"] = $pagination->limit;
            $query_row["offset"] = $pagination->offset;
        }

        $query = $pdo->prepare($sql);
        $query->execute($query_row);


        if (isset($fetch_class)) {
            $data = $query->fetchAll(PDO::FETCH_CLASS, $fetch_class);
        } else {
            $data = $query->fetchAll(PDO::FETCH_ASSOC);
        }



        $output = [];

        if (isset($pagination) && !isset($pagination->disabled)) {
            $output["total"] = $total;
            $output["page"] = $pagination->page;
            $output["per_page"] = count($data);

            $total_pages = ceil($total / $pagination->limit);

            $output["total_pages"] = $total_pages;
        }

        $output["data"] = $data;

        return $output;
    }

    public static function getFiltersSQL($filters, $range_date_column = "dateCreated")
    {

        if (count($filters) == 0) {
            return "";
        }
        $filters_sql = " WHERE ";

        //El conteo de filtros aplicados determina si se concatena el operador AND
        $filters_count = 0;

        foreach ($filters as $key => $filter) {

            if ($filters_count > 0) {
                $filters_sql .= " AND ";
            }

            //Filtrado por un campo de la tabla
            if ($key != "range_date" && $key != "search_pattern") {

                //Decodifica el valor del filtro en busca de un json
                if (is_array($filter) && count($filter) > 0) {

                    $filters_sql .= "(";

                    $filter_count = 0;

                    foreach ($filter as $k => $filter) {
                        if ($filter_count > 0) {
                            $filters_sql .= " OR ";
                        }

                        $filters_sql .= " $key = '$filter' ";
                        $filter_count++;
                    }

                    unset($filter_count);

                    $filters_sql .= ")";
                } else {
                    //Toma el valor como string
                    if ($filter === null || strtolower($filter) === 'null') {
                        $filters_sql .= " $key IS NULL ";
                    } else {
                        $filters_sql .= " $key = '$filter' ";
                    }
                }

                $filters_count++;
            } else {
                //Filtra usando el rango de fechas
                if ($key == "range_date") {
                    $filters_sql .= " $range_date_column BETWEEN '" . $filter["start_at"] . "' AND '" . $filter["end_at"] . "' ";
                    $filters_count++;
                }

                //Filtra mediante un patron de busqueda teniendo en cuenta las columnas definidas en el filtro
                if ($key == "search_pattern") {

                    $pattern = $filter["pattern"];

                    //El conteo de concatenaciones de busqueda determina si se usa el operador OR
                    $search_count = 0;

                    $filters_sql .= "(";

                    foreach ($filter["columns"] as $key => $column) {

                        if ($search_count > 0) {
                            $filters_sql .= " OR ";
                        }

                        //Se convierte el valor de la columna a un string en minuscula para evitar conflictos entre tipos de datos 
                        $filters_sql .= " LOWER($column) LIKE LOWER('%$pattern%') ";
                        $search_count++;
                    }

                    unset($search_count);

                    $filters_sql .= ")";

                    $filters_count++;
                }
            }
        }

        unset($filters_count);

        return $filters_sql;
    }
}
