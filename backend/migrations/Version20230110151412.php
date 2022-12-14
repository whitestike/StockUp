<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230110151412 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE brands (id VARCHAR(255) NOT NULL, product_id VARCHAR(255) DEFAULT NULL, brand_name VARCHAR(255) NOT NULL, INDEX IDX_7EA244344584665A (product_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE products (id VARCHAR(255) NOT NULL, code VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE tags (id VARCHAR(255) NOT NULL, product_id VARCHAR(255) DEFAULT NULL, tag_name VARCHAR(255) NOT NULL, INDEX IDX_6FBC94264584665A (product_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_has_product (id VARCHAR(255) NOT NULL, user_id VARCHAR(255) DEFAULT NULL, product_id VARCHAR(255) DEFAULT NULL, count INT NOT NULL, INDEX IDX_1DA0A5E3A76ED395 (user_id), INDEX IDX_1DA0A5E34584665A (product_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE users (id VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, user_roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL, INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE brands ADD CONSTRAINT FK_7EA244344584665A FOREIGN KEY (product_id) REFERENCES products (id)');
        $this->addSql('ALTER TABLE tags ADD CONSTRAINT FK_6FBC94264584665A FOREIGN KEY (product_id) REFERENCES products (id)');
        $this->addSql('ALTER TABLE user_has_product ADD CONSTRAINT FK_1DA0A5E3A76ED395 FOREIGN KEY (user_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE user_has_product ADD CONSTRAINT FK_1DA0A5E34584665A FOREIGN KEY (product_id) REFERENCES products (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE brands DROP FOREIGN KEY FK_7EA244344584665A');
        $this->addSql('ALTER TABLE tags DROP FOREIGN KEY FK_6FBC94264584665A');
        $this->addSql('ALTER TABLE user_has_product DROP FOREIGN KEY FK_1DA0A5E3A76ED395');
        $this->addSql('ALTER TABLE user_has_product DROP FOREIGN KEY FK_1DA0A5E34584665A');
        $this->addSql('DROP TABLE brands');
        $this->addSql('DROP TABLE products');
        $this->addSql('DROP TABLE tags');
        $this->addSql('DROP TABLE user_has_product');
        $this->addSql('DROP TABLE users');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
