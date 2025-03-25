<?php
// src/Controller/HomeController.php
namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    #[Route('/', name: 'home')]
    public function index(): Response
    {
        // Randează templates/base.html.twig
        return $this->render('base.html.twig');
    }
}
