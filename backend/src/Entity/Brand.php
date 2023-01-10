<?php

namespace App\Entity;

use Doctrine\ORM\PersistentCollection;

class Brand
{
    private PersistentCollection $products;

    private function __construct(
        private string $id,
        private string $brandName,
    ) {

    }

    public function id(): int
    {
        return $this->id;
    }

    public function brandName(): string
    {
        return $this->brandName;
    }
    
    public static function create(string $brandName): self
    {
        return new self(uniqid(), $brandName);
    }

}