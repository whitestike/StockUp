<?php
namespace App\Repository;

use App\Entity\Product;
use App\Entity\Brand;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

class BrandRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Brand::class);
    }

    public function getOrCreate(string $brandName): Brand
    {
        $entityManager = $this->getEntityManager();
        $brand = $entityManager->getRepository(Brand::class)->findOneBy(['brandName' => $brandName]);

        if($brand == null)
        {
            $brand = Brand::create($brandName);
            $entityManager->persist($brand);
            $entityManager->flush();
        }

        return $brand;
    }
}