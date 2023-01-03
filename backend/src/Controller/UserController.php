<?php
namespace App\Controller;

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

use App\Entity\Product;
use App\Entity\User;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Repository\UserRepository;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserController extends AbstractController
{
    #[Route('/signin/user/create', methods: ['POST'])]
    public function createUser(Request $request, UserRepository $UserRepo, UserPasswordHasherInterface $passwordHasher): Response
    {
        $content = json_decode($request->getContent());
        $email = $content->email;
        $password = $content->password;

        $user = User::create();

        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $password
        );

        $user->setPassword($hashedPassword);
        $user->setEmail($email);

        $UserRepo->save($user, true);

        $response = new Response();
    
        $response->headers->set('Content-Type', 'application/json');
        
        return $response;
    }
}