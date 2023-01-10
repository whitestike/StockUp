<?php
namespace App\Repository;

use App\Entity\Product;
use App\Entity\Tag;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

class TagRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Tag::class);
    }

    public function getOrCreate(string $tagName): Tag
    {
        $entityManager = $this->getEntityManager();
        $tag = $entityManager->getRepository(Tag::class)->findOneBy(['tagName' => $tagName]);

        if($tag == null)
        {
            $tag = Tag::create($tagName);
            $entityManager->persist($tag);
            $entityManager->flush();
        }

        return $tag;
    }
}