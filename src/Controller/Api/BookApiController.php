<?php
// src/Controller/Api/BookApiController.php
namespace App\Controller\Api;

use App\Entity\Book;
use App\Repository\BookRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/books')]
class BookApiController extends AbstractController
{
    // LISTARE cărți
    #[Route('/', name: 'api_books_index', methods: ['GET'])]
    public function index(BookRepository $bookRepository): JsonResponse
    {
        $books = $bookRepository->findAll();
        $data = [];

        foreach ($books as $book) {
            $data[] = [
                'id' => $book->getId(),
                'title' => $book->getTitle(),
                'author' => $book->getAuthor(),
                'description' => $book->getDescription(),
                'publish_date' => $book->getPublishDate()->format('Y-m-d'),
                'price' => $book->getPrice(),
            ];
        }

        return new JsonResponse($data, 200);
    }

    // CREARE carte
    #[Route('/', name: 'api_books_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $book = new Book();
        $book->setTitle($data['title'] ?? '');
        $book->setAuthor($data['author'] ?? '');
        $book->setDescription($data['description'] ?? '');
        $book->setPublishDate(new \DateTime($data['publish_date'] ?? 'now'));
        $book->setPrice($data['price'] ?? 0);

        $em->persist($book);
        $em->flush();

        return new JsonResponse(['status' => 'Carte creată cu succes!'], 201);
    }

    // DETALII carte
    #[Route('/{id}', name: 'api_books_show', methods: ['GET'])]
    public function show(Book $book): JsonResponse
    {
        $data = [
            'id' => $book->getId(),
            'title' => $book->getTitle(),
            'author' => $book->getAuthor(),
            'description' => $book->getDescription(),
            'publish_date' => $book->getPublishDate()->format('Y-m-d'),
            'price' => $book->getPrice(),
        ];

        return new JsonResponse($data, 200);
    }

    // EDITARE carte
    #[Route('/{id}', name: 'api_books_edit', methods: ['PUT'])]
    public function edit(Request $request, Book $book, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $book->setTitle($data['title'] ?? $book->getTitle());
        $book->setAuthor($data['author'] ?? $book->getAuthor());
        $book->setDescription($data['description'] ?? $book->getDescription());
        $book->setPublishDate(new \DateTime($data['publish_date'] ?? $book->getPublishDate()->format('Y-m-d')));
        $book->setPrice($data['price'] ?? $book->getPrice());

        $em->flush();

        return new JsonResponse(['status' => 'Carte editată cu succes!'], 200);
    }

    // ȘTERGERE carte
    #[Route('/{id}', name: 'api_books_delete', methods: ['DELETE'])]
    public function delete(Book $book, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($book);
        $em->flush();

        return new JsonResponse(['status' => 'Carte ștearsă cu succes!'], 200);
    }
}
