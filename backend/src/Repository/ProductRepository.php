<?php
namespace App\Repository;

use App\Entity\Product;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

class ProductRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Product::class);
    }

    public function getByCode(string $code): array
    {
        $entityManager = $this->getEntityManager();
        $product = $entityManager->getRepository(Product::class)->findOneBy(['code' => $code]);

        $returnArray = ["name" => $product->name(), "code" => $product->code()];

        return $returnArray;
    }
}