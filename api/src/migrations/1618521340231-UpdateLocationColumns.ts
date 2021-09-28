import { MigrationInterface, QueryRunner } from 'typeorm';

const Table = 'court_location';

export class UpdateLocationColumns1618521340231 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // clean table
    await queryRunner.query(`DELETE FROM ${Table}`);

    // delete column location_number
    await queryRunner.query(`ALTER TABLE ${Table} 
        DROP COLUMN location_number;`);

    // add new column location_code
    await queryRunner.query(`ALTER TABLE ${Table} ADD COLUMN "location_code" VARCHAR NOT NULL`);

    await queryRunner.query(`ALTER TABLE ${Table} ADD COLUMN "location_short_desc" VARCHAR NOT NULL`);

    // add lat, lng
    await queryRunner.query(`ALTER TABLE ${Table} ADD COLUMN "lat" NUMERIC`);
    await queryRunner.query(`ALTER TABLE ${Table} ADD COLUMN "lng" NUMERIC`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // clean table
    await queryRunner.query(`DELETE FROM ${Table}`);

    // add column location_number
    await queryRunner.query(`ALTER TABLE ${Table} 
     ADD COLUMN location_number int;`);

    //  delete location_code
    await queryRunner.query(`ALTER TABLE ${Table} DROP COLUMN "location_code"`);

    // delete lat, lng
    await queryRunner.query(`ALTER TABLE ${Table} DROP COLUMN "location_short_desc" NUMERIC`);
    await queryRunner.query(`ALTER TABLE ${Table} DROP COLUMN "lat" NUMERIC`);
    await queryRunner.query(`ALTER TABLE ${Table} DROP COLUMN "lng" NUMERIC`);

    // Initial Data
    await queryRunner.query(
      `
        INSERT INTO court_location(location_name,location_number) VALUES ('KELOWNA','4801');
        INSERT INTO court_location(location_name,location_number) VALUES ('NEW WESTMINSTER','3581');
        INSERT INTO court_location(location_name,location_number) VALUES ('RICHMOND','2025');
        INSERT INTO court_location(location_name,location_number) VALUES ('ROBSON SQUARE','2045');
        INSERT INTO court_location(location_name,location_number) VALUES ('VANCOUVER','2040');
       `,
    );
  }
}
