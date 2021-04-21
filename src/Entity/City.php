<?php

namespace App\Entity;

use App\Repository\CityRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=CityRepository::class)
 */
class City
{
    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $country;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $subcountry;

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     */
    private $geonameid;

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): self
    {
        $this->country = $country;

        return $this;
    }

    public function getSubcountry(): ?string
    {
        return $this->subcountry;
    }

    public function setSubcountry(string $subcountry): self
    {
        $this->subcountry = $subcountry;

        return $this;
    }

    public function getGeonameid(): ?int
    {
        return $this->geonameid;
    }

    public function setGeonameid(int $geonameid): self
    {
        $this->geonameid = $geonameid;

        return $this;
    }
}
