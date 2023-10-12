<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudyTime>
 */
class StudyTimeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $registerDate = $this->faker->dateTimeBetween('-1 month', 'now');
        return [
            'time' => $this->faker->numberBetween(1, 5),
            'language_id' => $this->faker->numberBetween(1, 8),
            'content_id' => $this->faker->numberBetween(1, 3),
            'created_at' => $registerDate,
            'updated_at' => $registerDate,
        ];
    }
}
