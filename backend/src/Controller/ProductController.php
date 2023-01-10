<?php
namespace App\Controller;

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

use App\Entity\Product;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Repository\ProductRepository;
use App\Repository\TagRepository;
use App\Repository\BrandRepository;

class ProductController extends AbstractController
{
    #[Route('/api/product/add', methods: ['POST'])]
    public function createProduct(Request $request, ProductRepository $ProductRepo, TagRepository $tagRepo, BrandRepository $brandRepo): Response
    {
        $content = json_decode($request->getContent());
        $code = $content->code;
        $name = $content->name;
        $requestBrand = $content->brand;
        $requestTag = $content->tag;

        $tag = $tagRepo->getOrCreate($requestBrand);
        $brand = $brandRepo->getOrCreate($requestTag);

        $ProductRepo->createOrUpdate($code, $name, $brand, $tag);

        $response = new Response();
    
        $response->headers->set('Content-Type', 'application/json');
        
        return $response;
    }
}