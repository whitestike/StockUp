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
use App\Repository\UserHasProductRepository;
use App\Repository\TagRepository;

class InventoryController extends AbstractController
{
    #[Route('/api/inventory/add', methods: ['POST'])]
    public function addToInventory(Request $request, UserHasProductRepository $userHasProductRepo): Response
    {
        $content = json_decode($request->getContent());
        $email = $content->email;
        $code = $content->code;
        $amount = 1;

        if(isset($content->amount))
        {
            $amount = $content->amount;
        }

        $userHasProductRepo->addProductToInventory($code, $email, $amount);

        $response = new Response();
    
        $response->headers->set('Content-Type', 'application/json');
        
        return $response;
    }

    #[Route('/api/inventory/remove', methods: ['POST'])]
    public function removeFromInventory(Request $request, UserHasProductRepository $userHasProductRepo): Response
    {
        $content = json_decode($request->getContent());
        $email = $content->email;
        $code = $content->code;
        $amount = 1;
        
        if(isset($content->amount))
        {
            $amount = $content->amount;
        }

        $userHasProductRepo->removeProductFromInventory($code, $email, $amount);

        $response = new Response();
    
        $response->headers->set('Content-Type', 'application/json');
        
        return $response;
    }

    #[Route('/api/inventory/get', methods: ['POST'])]
    public function fetchInventory(Request $request, UserHasProductRepository $userHasProductRepo, TagRepository $tagRepo): Response
    {
        $userEmail = json_decode($request->getContent())->email;
        
        $products = $userHasProductRepo->getProductFromUser($userEmail);
        $tags = $tagRepo->getTagsFromProductArray($products);

        $response = new Response();
        $response->setContent(json_encode(['products' => $products, 'tags' => $tags]));
    
        $response->headers->set('Content-Type', 'application/json');
        
        return $response;
    }

    #[Route('/api/inventory/toget', methods: ['POST'])]
    public function fetchProductsToGet(Request $request, UserHasProductRepository $userHasProductRepo, TagRepository $tagRepo): Response
    {
        $userEmail = json_decode($request->getContent())->email;

        $products = $userHasProductRepo->getProductFromUserWhereAmountIsZero($userEmail);
        $tags = $tagRepo->getTagsFromProductArray($products);

        $response = new Response();
        $response->setContent(json_encode(['products' => $products, 'tags' => $tags]));
    
        $response->headers->set('Content-Type', 'application/json');
        
        return $response;
    }

    #[Route('/api/wishlist/add', methods: ['POST'])]
    public function addToWishlist(Request $request, UserHasProductRepository $userHasProductRepo, TagRepository $tagRepo): Response
    {
        $content = json_decode($request->getContent());
        $userEmail = $content->email;


        $products = $userHasProductRepo->addToWishList($userEmail);
        $tags = $tagRepo->getTagsFromProductArray($products);

        $response = new Response();
        $response->setContent(json_encode(['products' => $products, 'tags' => $tags]));
    
        $response->headers->set('Content-Type', 'application/json');
        
        return $response;
    }
}