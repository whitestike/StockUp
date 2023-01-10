<?php

namespace App\Entity;

use Doctrine\ORM\PersistentCollection;

class Product
{
    private PersistentCollection $userHasProduct;

    private function __construct(
        private string $id,
        private string $code,
        private string $name,
        private Brand $brand,
        private Tag $tag,
    ) {

    }

    public function id(): int
    {
        return $this->id;
    }

    public function tag(): Tag
    {
        return $this->tag;
    }

    public function brand(): Brand
    {
        return $this->brand;
    }

    public function code(): string
    {
        return $this->code;
    }

    public function name(): string
    {
        return $this->name;
    }

    public function updateName(string $name): void
    {
        $this->name = $name;
    }

    public static function create(string $code ,string $name, Brand $brand, Tag $tag): self
    {
        return new self(uniqid(), $code, $name, $brand, $tag);
    }

}