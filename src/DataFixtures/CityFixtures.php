<?php

namespace App\DataFixtures;

use App\Entity\City;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\HttpKernel\KernelInterface;

class CityFixtures extends Fixture
{
    private $appKernel;

    public function __construct(KernelInterface $appKernel)
    {
        $this->appKernel = $appKernel;
    }

    public function load(ObjectManager $manager)
    {
        if (($handle = fopen("{$this->appKernel->getProjectDir()}/assets/cities.csv", 'r')) !== false) {
            while (($data = fgetcsv($handle)) !== false) {
                $city = new City();
                $city->setGeonameid($data[3]);
                $city->setName($data[0]);
                $city->setCountry($data[1]);
                $city->setSubcountry($data[2]);
                $manager->persist($city);
            }
            fclose($handle);
        }

        $manager->flush();
    }
}
