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

    public function addProductToInventory(string $code,int $userId): void 
    {
        $entityManager = $this->getEntityManager();
        $product = $entityManager->getRepository(Product::class)->findOneBy(['code' => $code]);
        $user = $entityManager->getRepository(User::class)->find($userId);
        $userHasProduct = UserHasProduct::create($user, $product);
        $entityManager->persist($userHasProduct);
        $entityManager->flush();
    }

    public function removeProductFromInventory(string $code,int $userId): void 
    {
        $entityManager = $this->getEntityManager();
        $product = $entityManager->getRepository(Product::class)->findOneBy(['code' => $code]);
        $user = $entityManager->getRepository(User::class)->find($userId);
        $userHasProduct = $entityManager->getRepository(UserHasProduct::class)->findOneBy(['user' => $user, 'product' => $product]);
        $entityManager->remove($userHasProduct);
        $entityManager->flush();
    }
}