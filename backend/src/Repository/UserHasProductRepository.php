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

    public function getProductFromUser(string $userEmail): array 
    {
        $entityManager = $this->getEntityManager();
        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $userEmail]);
        $products = $entityManager->getRepository(UserHasProduct::class)->findBy(['user' => $user]);

        $productsFromUser = [];
        foreach($products as $product){
            if($product->count() > 0){
                array_push($productsFromUser, $product->toArray());
            }
        }

        return $productsFromUser;
    }

    public function getProductFromUserWhereAmountIsZero(string $userEmail): array 
    {
        $entityManager = $this->getEntityManager();
        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $userEmail]);
        $products = $entityManager->getRepository(UserHasProduct::class)->findBy(['user' => $user]);

        $productsFromUser = [];
        foreach($products as $product){
            if($product->count() == 0){
                array_push($productsFromUser, $product->toArray());
            }
        }

        return $productsFromUser;
    }

    public function addProductToInventory(string $code, string $userEmail, int $amount): void 
    {
        $entityManager = $this->getEntityManager();
        $product = $entityManager->getRepository(Product::class)->findOneBy(['code' => $code]);
        $user = $entityManager->getRepository(User::class)->findOneBy(["email" => $userEmail]);

        $userHasProduct = $entityManager->getRepository(UserHasProduct::class)->findOneBy(['user' => $user, 'product' => $product]);

        if($userHasProduct == null)
        {
            $userHasProduct = UserHasProduct::create($user, $product);
        }

        $userHasProduct->addToCount($amount);
        $entityManager->persist($userHasProduct);

        $entityManager->flush();
    }

    public function removeProductFromInventory(string $code, string $userEmail, int $amount): void 
    {
        $entityManager = $this->getEntityManager();
        $product = $entityManager->getRepository(Product::class)->findOneBy(['code' => $code]);
        $user = $entityManager->getRepository(User::class)->findOneBy(["email" => $userEmail]);
        $userHasProduct = $entityManager->getRepository(UserHasProduct::class)->findOneBy(['user' => $user, 'product' => $product]);
        if($userHasProduct->count() < $amount)
        {
            $amount = $userHasProduct->count();
        }
        $userHasProduct->subtractFromCount($amount);
        $entityManager->persist($userHasProduct);
        $entityManager->flush();
    }

    public function addItemToWishlist(string $email, string $code): void 
    {
        $entityManager = $this->getEntityManager();
        $product = $entityManager->getRepository(Product::class)->findOneBy(['code' => $code]);
        $user = $entityManager->getRepository(User::class)->findOneBy(["email" => $email]);
        $userHasProduct = $entityManager->getRepository(UserHasProduct::class)->findOneBy(['user' => $user, 'product' => $product]);
        $userHasProduct->addToWishList();
        $entityManager->persist($userHasProduct);
        $entityManager->flush();
    }

    public function removeItemFromWishlist(string $email, string $code): void 
    {
        $entityManager = $this->getEntityManager();
        $product = $entityManager->getRepository(Product::class)->findOneBy(['code' => $code]);
        $user = $entityManager->getRepository(User::class)->findOneBy(["email" => $email]);
        $userHasProduct = $entityManager->getRepository(UserHasProduct::class)->findOneBy(['user' => $user, 'product' => $product]);
        $userHasProduct->removeFromWishList();
        $entityManager->persist($userHasProduct);
        $entityManager->flush();
    }
}