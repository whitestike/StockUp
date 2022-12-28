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

class InventoryController extends AbstractController
{
    #[Route('/api/inventory/add', methods: ['POST'])]
    public function addToInventory(Request $request, UserHasProductRepository $userHasProductRepo): Response
    {
        $content = json_decode($request->getContent());
        $userId = $content->userId;
        $code = $content->code;
        
        $userHasProductRepo->addProductToInventory($code, $userId);

        $response = new Response();
    
        $response->headers->set('Content-Type', 'application/json');
        
        return $response;
    }

    #[Route('/api/inventory/remove', methods: ['POST'])]
    public function removeFromInventory(Request $request, UserHasProductRepository $userHasProductRepo): Response
    {
        $content = json_decode($request->getContent());
        $userId = $content->userId;
        $code = $content->code;
        
        $userHasProductRepo->removeProductFromInventory($code, $userId);

        $response = new Response();
    
        $response->headers->set('Content-Type', 'application/json');
        
        return $response;
    }

    #[Route('/api/inventory/get', methods: ['POST'])]
    public function fetchInventory(Request $request, UserHasProductRepository $userHasProductRepo): Response
    {
        $userEmail = json_decode($request->getContent())->email;
        
        $products = $userHasProductRepo->getProductFromUser($userEmail);

        $response = new Response();
        $response->setContent(json_encode(['products' => $products]));
    
        $response->headers->set('Content-Type', 'application/json');
        
        return $response;
    }
}