<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230110153957 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE brands DROP FOREIGN KEY FK_7EA244344584665A');
        $this->addSql('DROP INDEX IDX_7EA244344584665A ON brands');
        $this->addSql('ALTER TABLE brands DROP product_id');
        $this->addSql('ALTER TABLE products ADD tag_id VARCHAR(255) DEFAULT NULL, ADD brand_id VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE products ADD CONSTRAINT FK_B3BA5A5ABAD26311 FOREIGN KEY (tag_id) REFERENCES tags (id)');
        $this->addSql('ALTER TABLE products ADD CONSTRAINT FK_B3BA5A5A44F5D008 FOREIGN KEY (brand_id) REFERENCES brands (id)');
        $this->addSql('CREATE INDEX IDX_B3BA5A5ABAD26311 ON products (tag_id)');
        $this->addSql('CREATE INDEX IDX_B3BA5A5A44F5D008 ON products (brand_id)');
        $this->addSql('ALTER TABLE tags DROP FOREIGN KEY FK_6FBC94264584665A');
        $this->addSql('DROP INDEX IDX_6FBC94264584665A ON tags');
        $this->addSql('ALTER TABLE tags DROP product_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE brands ADD product_id VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE brands ADD CONSTRAINT FK_7EA244344584665A FOREIGN KEY (product_id) REFERENCES products (id)');
        $this->addSql('CREATE INDEX IDX_7EA244344584665A ON brands (product_id)');
        $this->addSql('ALTER TABLE products DROP FOREIGN KEY FK_B3BA5A5ABAD26311');
        $this->addSql('ALTER TABLE products DROP FOREIGN KEY FK_B3BA5A5A44F5D008');
        $this->addSql('DROP INDEX IDX_B3BA5A5ABAD26311 ON products');
        $this->addSql('DROP INDEX IDX_B3BA5A5A44F5D008 ON products');
        $this->addSql('ALTER TABLE products DROP tag_id, DROP brand_id');
        $this->addSql('ALTER TABLE tags ADD product_id VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE tags ADD CONSTRAINT FK_6FBC94264584665A FOREIGN KEY (product_id) REFERENCES products (id)');
        $this->addSql('CREATE INDEX IDX_6FBC94264584665A ON tags (product_id)');
    }
}
