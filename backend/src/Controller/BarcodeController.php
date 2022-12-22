<?php
namespace App\Controller; 

header('Access-Control-Allow-Origin: *');

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class BarcodeController extends AbstractController
{
    #[Route('/barcode', methods: ['POST'])]
    public function number(Request $request): Response
    {
        isset(json_decode($request->getContent())->code) ? $data = ['code' => json_decode($request->getContent())->code] : $data = "no code given";
        return $this->json(
            $data,
            headers: ['Content-Type' => 'application/json;charset=UTF-8']
        );
    }
}