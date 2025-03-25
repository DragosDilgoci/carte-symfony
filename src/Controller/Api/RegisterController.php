<?php

namespace App\Controller\Api;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class RegisterController extends AbstractController
{
    #[Route('/register', name: 'api_register', methods: ['POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $email = $data['email'] ?? null;
        $plainPassword = $data['password'] ?? null;

        if (!$email || !$plainPassword) {
            return new JsonResponse(['error' => 'Email and password are required'], 400);
        }

        // Verifică dacă userul există deja
        $existingUser = $em->getRepository(User::class)->findOneBy(['email' => $email]);
        if ($existingUser) {
            return new JsonResponse(['error' => 'User already exists'], 400);
        }

        $user = new User();
        $user->setEmail($email);
        // Hash parola
        $hashedPassword = $passwordHasher->hashPassword($user, $plainPassword);
        $user->setPassword($hashedPassword);
        // Setează rolul implicit
        $user->setRoles(['ROLE_USER']);

        $em->persist($user);
        $em->flush();

        return new JsonResponse(['status' => 'User created'], 201);
    }
}
