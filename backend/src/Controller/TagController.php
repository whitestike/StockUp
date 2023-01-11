<?php
namespace App\Controller;

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

use App\Entity\Product;
use App\Entity\Tag;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Repository\ProductRepository;
use App\Repository\TagRepository;
use App\Repository\BrandRepository;

class TagController extends AbstractController
{
    #[Route('/api/tags/get', methods: ['POST'])]
    public function getAllTags(Request $request, TagRepository $tagRepo): Response
    {
        $content = json_decode($request->getContent());

        $tags = $tagRepo->getAllTags();

        $response = new Response();
    
        $response->setContent(json_encode(['tags' => $tags]));

        $response->headers->set('Content-Type', 'application/json');
        
        return $response;
    }
}