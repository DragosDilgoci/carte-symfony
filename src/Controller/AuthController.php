<?php

namespace App\Controller;

use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class AuthController extends AbstractController
{
    #[Route('/api/refresh', name: 'api_refresh', methods: ['POST'])]
    public function refresh(Request $request, JWTTokenManagerInterface $JWTManager, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $refreshToken = $data['refresh_token'] ?? null;

        if (!$refreshToken) {
            return new JsonResponse(['error' => 'Refresh token is required'], 400);
        }

        // Verificăm dacă refresh token-ul este valid
        // Acum trebuie să deserializăm refresh tokenul
        $user = $this->getUserFromRefreshToken($refreshToken, $JWTManager);

        if (!$user) {
            return new JsonResponse(['error' => 'Invalid refresh token'], 401);
        }

        // Generăm un nou acces token
        $newAccessToken = $JWTManager->create($user);

        return new JsonResponse(['token' => $newAccessToken]);
    }

    private function getUserFromRefreshToken(string $refreshToken, JWTTokenManagerInterface $JWTManager)
    {
        try {
            $data = $JWTManager->decodeFromJsonWebToken($refreshToken);
            $user = $this->getDoctrine()->getRepository(User::class)->find($data['username']);

            return $user;
        } catch (\Exception $e) {
            return null;
        }
    }
}
