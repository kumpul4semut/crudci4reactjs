<?php

namespace App\Models;

use CodeIgniter\Model;

class Quotes_model extends Model
{
    protected $table      = 'quotes';

    public function insertQuotes($data)
    {
        return $this->db->table($this->table)->insert($data);
    }

    public function updateQuotes($data, $id)
    {
        return $this->db->table($this->table)->update($data, ['quote_id' => $id]);
    }

    public function deleteQuotes($id)
    {
        return $this->db->table($this->table)->delete(['quote_id' => $id]);
    }
}
