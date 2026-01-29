import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1769691597334 implements MigrationInterface {
    name = 'InitialSchema1769691597334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_collection" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_a15a3843f63bb1c1a9711826739" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meal" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "image" bytea, CONSTRAINT "PK_ada510a5aba19e6bb500f8f7817" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "nutrition" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "value" double precision NOT NULL, "unit" character varying NOT NULL, "ingredientId" uuid, CONSTRAINT "PK_e8da4724c54762e994d879b11c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_collection_meals_meal" ("userCollectionId" uuid NOT NULL, "mealId" uuid NOT NULL, CONSTRAINT "PK_e1b5a0a3fa635802ff2f0330d07" PRIMARY KEY ("userCollectionId", "mealId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_90202630c0b35cb93c958f7175" ON "user_collection_meals_meal" ("userCollectionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_24a6fcb10c809dcccbb2bca9c5" ON "user_collection_meals_meal" ("mealId") `);
        await queryRunner.query(`CREATE TABLE "meal_ingredients_ingredient" ("mealId" uuid NOT NULL, "ingredientId" uuid NOT NULL, CONSTRAINT "PK_aa76427d47d60ca84bfa58ecd21" PRIMARY KEY ("mealId", "ingredientId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fc85eb45936533d0354dd5f453" ON "meal_ingredients_ingredient" ("mealId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6b293c1a7f09dfdb4171bb59dc" ON "meal_ingredients_ingredient" ("ingredientId") `);
        await queryRunner.query(`ALTER TABLE "user_collection" ADD CONSTRAINT "FK_ea2e8bed8ef935e94917b71d220" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nutrition" ADD CONSTRAINT "FK_aa5c131c0283e6651397500f21b" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_collection_meals_meal" ADD CONSTRAINT "FK_90202630c0b35cb93c958f7175e" FOREIGN KEY ("userCollectionId") REFERENCES "user_collection"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_collection_meals_meal" ADD CONSTRAINT "FK_24a6fcb10c809dcccbb2bca9c56" FOREIGN KEY ("mealId") REFERENCES "meal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meal_ingredients_ingredient" ADD CONSTRAINT "FK_fc85eb45936533d0354dd5f453f" FOREIGN KEY ("mealId") REFERENCES "meal"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "meal_ingredients_ingredient" ADD CONSTRAINT "FK_6b293c1a7f09dfdb4171bb59dc5" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meal_ingredients_ingredient" DROP CONSTRAINT "FK_6b293c1a7f09dfdb4171bb59dc5"`);
        await queryRunner.query(`ALTER TABLE "meal_ingredients_ingredient" DROP CONSTRAINT "FK_fc85eb45936533d0354dd5f453f"`);
        await queryRunner.query(`ALTER TABLE "user_collection_meals_meal" DROP CONSTRAINT "FK_24a6fcb10c809dcccbb2bca9c56"`);
        await queryRunner.query(`ALTER TABLE "user_collection_meals_meal" DROP CONSTRAINT "FK_90202630c0b35cb93c958f7175e"`);
        await queryRunner.query(`ALTER TABLE "nutrition" DROP CONSTRAINT "FK_aa5c131c0283e6651397500f21b"`);
        await queryRunner.query(`ALTER TABLE "user_collection" DROP CONSTRAINT "FK_ea2e8bed8ef935e94917b71d220"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6b293c1a7f09dfdb4171bb59dc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fc85eb45936533d0354dd5f453"`);
        await queryRunner.query(`DROP TABLE "meal_ingredients_ingredient"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_24a6fcb10c809dcccbb2bca9c5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_90202630c0b35cb93c958f7175"`);
        await queryRunner.query(`DROP TABLE "user_collection_meals_meal"`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
        await queryRunner.query(`DROP TABLE "nutrition"`);
        await queryRunner.query(`DROP TABLE "meal"`);
        await queryRunner.query(`DROP TABLE "user_collection"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
