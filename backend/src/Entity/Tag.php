<?php

namespace App\Entity;

use Doctrine\ORM\PersistentCollection;

class Tag
{
    private PersistentCollection $products;

    private function __construct(
        private string $id,
        private string $tagName,
    ) {

    }

    public function id(): int
    {
        return $this->id;
    }

    public function tagName(): string
    {
        return $this->tagName;
    }
    
    public static function create(string $tagName): self
    {
        return new self(uniqid(), $tagName);
    }

}