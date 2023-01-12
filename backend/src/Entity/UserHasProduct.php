<?php
namespace App\Entity;

class UserHasProduct
{
    private function __construct(
        private string $id,
        private User $user,
        private Product $product,
        private bool $onWishList = false,
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

    public function addToWishList(): void
    {
        if($this->count == 0)
        {
            $this->onWishList = true;
        }
    }

    public function removeFromWishList(): void
    {
        $this->onWishList = false;
    }

    public function isOnWishList(): bool
    {
        return $this->onWishList;
    }

    public function count(): int
    {
        return $this->count;
    }

    public function addToCount(int $amount): void
    {
        if($this->onWishList)
        {
            $this->onWishList = false;
        }
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
            'onWishList' => $this->onWishList,
            'product' => [
                'name' => $this->product->name(), 
                'code' => $this->product->code(), 
                'brand' => $this->product->brand()->brandName(), 
                'tag' => $this->product->tag()->tagName()
            ],
            'count' => $this->count
        );
    }

    public static function create(User $user, Product $product): self
    {
        return new self(uniqid(), $user, $product, false, 0);
    }
}