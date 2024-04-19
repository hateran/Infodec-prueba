<?php

namespace App\controllers;

use App\Services\FetchAllHelper;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Services\UtilsHelper;
use PDO;

class CountryController
{
    private $tableName = "countries";

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
            "idCountry",
            "cca2",
            "cca3",
            "commonName",
            "translationKey",
            "dateCreated",
            "dateUpdated",
        ];

        //columnas por las que va a ordenar (una) ordenar por id_topo o por title etc...
        $sort_columns = ["idCountry"];

        //Filtro
        //columnas por las que se va filtrar (multiples valores o uno)
        $filter_columns = [
            "idCountry" => "int",
            "commonName" => "string",
            "cca3" => "string",
        ];

        //Buscador
        //filtra y busca coincidencia con las columnas que se le pasa. (multiples valores o uno)
        $search_columns = [];

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
