<?php
namespace App\Entity;

class UserHasProduct
{
    private function __construct(
        private int $id,
        private User $user,
        private Product $product,
    ) {

    }

    public function user(): User
    {
        return $this->user;
    }
    public function product(): Product
    {
        return $this->product;
    }

    public static function create(User $user, Product $product): self
    {
        return new self($user, $product);
    }
}