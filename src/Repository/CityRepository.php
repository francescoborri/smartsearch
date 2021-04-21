<?php

namespace App\Repository;

use App\Entity\City;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class CityRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, City::class);
    }

    public function findFilteringByCityName($filter)
    {
        $queryBuilder = $this->createQueryBuilder('city');
        return $queryBuilder->andWhere($queryBuilder->expr()->like('city.name', ':filter'))
            ->setParameter('filter', "$filter%")
            ->orderBy('city.name', 'ASC')
            ->setMaxResults(50)
            ->getQuery()
            ->getResult();
    }
}
