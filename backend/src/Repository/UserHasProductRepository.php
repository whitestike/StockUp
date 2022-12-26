<?php
namespace App\Repository;

use App\Entity\Product;
use App\Entity\User;
use App\Entity\UserHasProduct;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

class UserHasProductRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserHasProduct::class);
    }

    public function getProductFromUser(int $userId): array 
    {
        $entityManager = $this->getEntityManager();
        $products = $entityManager->getRepository(UserHasProduct::class)->findBy(['user' => $userId]);
        return $products;
    }
}