import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InitMigration1747675462347 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: "subscribers",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "email",
                    type: "text",
                    isNullable: false,
                },
                {
                    name: "city",
                    type: "text",
                    isNullable: false,
                },
                {
                    name: "frequency",
                    type: "text",
                    isNullable: false,
                },
                {
                    name: "is_verified",
                    type: "boolean",
                    isNullable: false,
                    default: false,
                },
            ],
        }));

        await queryRunner.createTable(new Table({
            name: "forecast",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "city",
                    type: "text",
                    isNullable: false,
                },
                {
                    name: "temperature",
                    type: "integer",
                    isNullable: false,
                },
                {
                    name: "humidity",
                    type: "integer",
                    isNullable: false,
                },
                {
                    name: "description",
                    type: "text",
                    isNullable: false,
                },
            ],
        }));

        await queryRunner.query(`
          INSERT INTO forecast (city, temperature, humidity, description) VALUES
            ('Kyiv', 20, 60, 'Sunny'),
            ('Lviv', 18, 70, 'Cloudy'),
            ('Odesa', 25, 50, 'Clear sky')
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("forecast");
        await queryRunner.dropTable("subscribers");
    }

}
