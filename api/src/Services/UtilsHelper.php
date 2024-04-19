<?php

namespace App\Services;

use Slim\Psr7\Factory\ResponseFactory;
use PDO;

class UtilsHelper
{
    public static function JSON($data, $status = 200)
    {
        $rf = new ResponseFactory();
        $response = $rf->createResponse();
        $response->getBody()->write(json_encode($data));
        return $response
            ->withHeader("Content-type", "application/json")
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Methods', 'POST')
            ->withStatus($status);
    }

    public static function error($type, $description, $status = 400)
    {
        return self::JSON([
            "status" => $status,
            "error" => [
                "type" => $type,
                "description" => $description
            ]
        ], $status);
    }

    public static function checkFieldAvailability(string $table, array $row, PDO $pdo)
    {
        $columns = array_keys($row);
        $sql = "SELECT * FROM $table WHERE ";
        $count = 1;
        foreach ($columns as $key => $column) {
            $sql .= "$column = :$column";
            if (count($columns) > $count) {
                $sql .= " AND ";
                $count = $count + 1;
            }
        }
        $query = $pdo->prepare($sql);
        $query->execute($row);
        $unique = $query->fetchColumn();
        if ($unique > 0) {
            return false;
        }
        return true;
    }

    public static function validateRequiredFields($params, array $fields)
    {
        foreach ($fields as $key => $value) {
            if (!isset($params[$value]) || $params[$value] == '') {
                return $value;
            }
        }
    }

    public static function insert(PDO $pdo, array $row, string $tableName): bool
    {
        $key = array_keys($row);
        $query = $pdo->prepare("INSERT INTO " . $tableName . " (" . implode(', ', $key) . ") " . "VALUES (:" . implode(", :", $key) . ")");
        return $query->execute($row);
    }
}
