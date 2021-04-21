<?php

namespace App\Controller;

use App\Entity\City;
use App\Repository\CityRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api", name="api.")
 */
class CityController extends AbstractController
{
    /**
     * @Route("/cities", name="cities")
     */
    public function list(Request $request, CityRepository $cityRepository): Response
    {
        $filter = $request->query->has('value') ? $request->query->get('value') : '';

        return $this->json([
            'cities' => $cityRepository->findFilteringByCityName($filter)
        ]);
    }

    /**
     * @Route("/city/{geonameid}", name="city")
     */
    public function find(City $city): Response
    {
        return $this->json([
            'city' => $city
        ]);
    }
}
