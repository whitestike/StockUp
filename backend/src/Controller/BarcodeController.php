<?php
namespace App\Controller; 

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class BarcodeController extends AbstractController
{
    #[Route('/barcode', methods: ['POST'])]
    public function number(Request $request): Response
    {
        $data = json_decode($request->getContent())->code;
        return new Response(
            ["code" => $data],
            ['Content-Type' => 'application/json;charset=UTF-8']
        );
    }
}