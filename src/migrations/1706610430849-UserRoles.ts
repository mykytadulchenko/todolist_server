import { MigrationInterface, QueryRunner } from 'typeorm'
import { ROLES } from '../users/users.enums'

export class UserRoles1706610430849 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE users ADD role VARCHAR(16)')
    await queryRunner.query('UPDATE users SET role = $1 WHERE role IS NULL', [ROLES.user])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE users DROP COLUMN role')
  }
}
