<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;
use PHPUnit\Framework\Constraint\Constraint;

class Quotes extends Migration
{
	public function up()
	{
		$this->forge->addField([
			'quote_id' => [
				'type' => 'INT',
				'Constraint' => 5,
				'unsigned' => TRUE,
				'auto_increment' => TRUE
			],
			'quotes' => [
				'type' => 'VARCHAR',
				'constraint' => 100
			]
		]);
		$this->forge->addKey('quote_id', TRUE);
		$this->forge->createTable('quotes');
	}

	//--------------------------------------------------------------------

	public function down()
	{
		$this->forge->dropTable('quotes');
	}
}
