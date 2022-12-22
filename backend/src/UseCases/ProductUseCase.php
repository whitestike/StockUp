<?php
namespace App\UseCases;

use App\Repository\ProductRepository;
use App\Entity\Product;

class ProductUseCase
{
    private function __construct(
        private ProductRepository $productRepo
    ) {

    }

    public function processBarcode(string $code): array
    {
        $product = $this->productRepo->getByCode($code);

        $returnArray = ["name" => $product->name(), "code" => $product->code()];

        return $returnArray;
    }
}