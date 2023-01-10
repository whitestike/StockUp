<?php
namespace App\Repository;

use App\Entity\Brand;
use App\Entity\Tag;
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

        if($product == null)
        {
            $returnArray = ["name" => 'no product linked to code', "code" => $code];
        }else
        {
            $returnArray = ["name" => $product->name(), "code" => $product->code()];
        }


        return $returnArray;
    }

    public function createOrUpdate(string $code, string $name, Brand $brand, Tag $tag): void
    {
        $entityManager = $this->getEntityManager();

        $product = $entityManager->getRepository(Product::class)->findOneBy(['code' => $code]);

        if($product == null)
        {
            $product = Product::create($code, $name, $brand, $tag);
        }
        else{
            $product->updateName($name);
        }
        
        $entityManager->persist($product);
        $entityManager->flush();
    }
}