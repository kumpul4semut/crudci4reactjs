<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class Quotes extends ResourceController
{

    protected $format = 'json';
    protected $modelName = 'App\Models\Quotes_model';

    public function create()
    {
        $quote = $this->request->getPost('quote');
        $data = [
            'quotes' => $quote
        ];
        $save = $this->model->insertQuotes($data);
        if ($save) {
            $msg = ['message' => 'Created data success'];
            $response = [
                'status' => 200,
                'error' => false,
                'data' => $msg
            ];
            return $this->respond($response, 200);
        }

        $response = [
            'status' => 400,
            'error' => false,
            'data' => $save
        ];
        return $this->respond($response, 400);
    }

    public function index()
    {
        $result = $this->model->orderBy('quote_id', "DESC")
            ->findAll();
        return ($this->respond($result, 200));
    }

    public function edit($id = NULL)
    {
        $result = $this->model->getWhere(['quote_id' => $id])->getRowArray();
        if ($result) {
            $response = [
                'status' => 200,
                'error' => false,
                'data' => $result
            ];
            return $this->respond($response, 200);
        }
        $response = [
            'status' => 401,
            'error' => true,
            'data' => 'not found'
        ];
        return $this->respond($response, 401);
    }

    public function update($id = NULL)
    {
        $data = $this->request->getRawInput();
        $exec = $this->model->updateQuotes($data, $id);
        if ($exec) {
            $response = [
                'status' => 200,
                'error' => false,
                'message' => 'Data updated'
            ];
            return $this->respond($response, 200);
        }
        $response = [
            'status' => 401,
            'error' => true,
            'data' => 'not found'
        ];
        return $this->respond($response, 401);
    }

    public function delete($id = null)
    {
        $exec = $this->model->deleteQuotes($id);
        if ($exec) {
            $response = [
                'status' => 200,
                'error' => false,
                'message' => 'Data deleted'
            ];
            return $this->respond($response, 200);
        }
        $response = [
            'status' => 401,
            'error' => true,
            'data' => 'not found'
        ];
        return $this->respond($response, 401);
    }
}
