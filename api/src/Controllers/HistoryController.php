<?php

namespace App\controllers;

use App\Services\FetchAllHelper;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Services\UtilsHelper;
use PDO;

class HistoryController
{
    private $tableName = "history";

    public function __construct(
        PDO $pdo
    ) {
        $this->pdo = $pdo;
    }

    public function create(Request $request)
    {
        $params = $request->getParsedBody();
        $validateParams = ["weather", "currencyConversion"];
        $result = UtilsHelper::validateRequiredFields($params, $validateParams);

        if (isset($result)) {
            return UtilsHelper::error("REQUIRED_PARAMETER", "The parameter '" . $result .  "' is required");
        }

        //Se crea un array de datos que se va a guardar en la base de datos con los parámetros que están en $params
        $row = [
            'weather' => $params["weather"],
            'currencyConversion' => $params['currencyConversion'],
        ];

        $success = UtilsHelper::insert($this->pdo, $row, $this->tableName);
        if (!$success) {
            return UtilsHelper::JSON([
                "status" => 400,
                "message" => "History could not be created"
            ]);
        }

        return UtilsHelper::JSON([
            "status" => 200,
            "message" => 'History created'
        ]);
    }

    public function list(Request $request)
    {
        $params = $request->getQueryParams();

        //columnas que quiero que traiga la query response
        $columns = [
            "idHistory",
            "weather",
            "currencyConversion",
            "dateCreated",
        ];

        //columnas por las que va a ordenar (una) ordenar por id_topo o por title etc...
        $sort_columns = [
            "idHistory",
            "dateCreated",
        ];
        //Filtro
        //columnas por las que se va filtrar (multiples valores o uno)
        $filter_columns = [
            "idHistory" => "int",
            "weather" => "string",
            "currencyConversion" => "string",
        ];

        //Buscador
        //filtra y busca coincidencia con las columnas que se le pasa. (multiples valores o uno)
        $search_columns = ["weather", "currencyConversion"];

        $filters = FetchAllHelper::getfilters($params, $filter_columns, $search_columns);
        $order_by = FetchAllHelper::getOrderBy($params, $sort_columns);
        $pagination = FetchAllHelper::getPagination($params);
        $data = FetchAllHelper::fetchAll($this->tableName, $columns, $filters, $order_by, $pagination, $this->pdo);
        return UtilsHelper::JSON(array_merge(
            [
                "status" => 200
            ],
            $data
        ));
    }
}
