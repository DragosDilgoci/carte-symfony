<?php
// src/Controller/Api/CheckoutController.php
namespace App\Controller\Api;

use App\Service\PaymentService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/checkout')]
class CheckoutController extends AbstractController
{
    public function __construct(private PaymentService $paymentService) {}

    #[Route('/', name: 'api_checkout', methods: ['POST'])]
    public function checkout(Request $request): JsonResponse
    {
        $paymentData = json_decode($request->getContent(), true);

        if ($this->paymentService->processPayment($paymentData)) {
            return new JsonResponse(['success' => true, 'message' => 'Plata a fost procesată cu succes'], 200);
        }

        return new JsonResponse(['success' => false, 'message' => 'Plata a eșuat'], 400);
    }
}
