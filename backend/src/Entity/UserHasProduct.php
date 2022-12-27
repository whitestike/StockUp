<?php
namespace App\Entity;

class UserHasProduct
{
    private function __construct(
        private string $id,
        private User $user,
        private Product $product,
        private int $count,
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

    public function count(): int
    {
        return $this->count;
    }

    public function addToCount(int $amount): void
    {
        $this->count += $amount;
    }

    public function subtractFromCount(int $amount): void
    {
        if($this->count > 0){
            $this->count -= $amount;
        }
    }

    public function toArray(): array
    {
        return array(
            'id' => $this->id,
            'product' => ['name' => $this->product->name(), 'code' => $this->product->code()],
            'count' => $this->count
        );
    }

    public static function create(User $user, Product $product): self
    {
        return new self(uniqid(), $user, $product);
    }
}