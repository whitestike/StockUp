<?php

namespace App\Entity;

use Doctrine\ORM\PersistentCollection;

class Product
{
    private PersistentCollection $userHasProduct;

    private function __construct(
        private int $id,
        private string $code,
        private string $name,
    ) {

    }

    public function id(): int
    {
        return $this->id;
    }

    public function code(): string
    {
        return $this->code;
    }

    public function name(): string
    {
        return $this->name;
    }

    public static function create(int $id ,string $code ,string $name): self
    {
        return new self($id, $code, $name);
    }

}