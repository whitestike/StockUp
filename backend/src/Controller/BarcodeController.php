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
        return new Response(
            "test"
        );
    }
}