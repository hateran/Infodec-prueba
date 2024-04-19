<?php

namespace App\controllers;

use App\Services\FetchAllHelper;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Services\UtilsHelper;
use PDO;

class CityController
{
    private $tableName = "cities";

    public function __construct(
        PDO $pdo
    ) {
        $this->pdo = $pdo;
    }

    public function list(Request $request)
    {
        $params = $request->getQueryParams();

        //columnas que quiero que traiga la query response
        $columns = [
            $this->tableName . ".idCity",
            $this->tableName . ".idCountry",
            $this->tableName . ".commonName",
            $this->tableName . ".translationKey",
            $this->tableName . ".dateCreated",
            $this->tableName . ".dateUpdated",
        ];

        //columnas por las que va a ordenar (una) ordenar por id_topo o por title etc...
        $sort_columns = [$this->tableName . ".idCity"];

        //Filtro
        //columnas por las que se va filtrar (multiples valores o uno)
        $filter_columns = [
            $this->tableName . ".idCity" => "int",
            $this->tableName . ".idCountry" => "int",
            $this->tableName . ".commonName" => "string",
            "countries.cca3" => "string",
        ];

        //Buscador
        //filtra y busca coincidencia con las columnas que se le pasa. (multiples valores o uno)
        $search_columns = [];

        $join = array([
            "local_table" => $this->tableName,
            "local_column" => "idCountry",
            "referenced_table" => "countries",
            "referenced_column" => "idCountry",
            "type" => "LEFT"
        ]);

        $join_filters = [
            "cca3" => "countries.cca3"
        ];

        $params = FetchAllHelper::formatJoin($params, $this->tableName, $join_filters);
        $filters = FetchAllHelper::getfilters($params, $filter_columns, $search_columns);
        $order_by = FetchAllHelper::getOrderBy($params, $sort_columns);
        $pagination = FetchAllHelper::getPagination($params);
        $data = FetchAllHelper::fetchAll($this->tableName, $columns, $filters, $order_by, $pagination, $this->pdo, $join);
        return UtilsHelper::JSON(array_merge(
            [
                "status" => 200
            ],
            $data
        ));
    }
}
