<?php
namespace App\Controller; 

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class BarcodeController extends AbstractController
{
    #[Route('/barcode', methods: ['POST'])]
    public function number(Request $request): Response
    {
        $response = new Response();
        $code = json_decode($request->getContent())->code;
        $response->setContent(json_encode(['code' => $code]));
    
        $response->headers->set('Content-Type', 'application/json');
        
        return $response;
    }
}