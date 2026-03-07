<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Seeder;

class CalculusOneResourcesSeeder extends Seeder
{
    /**
     * Seed Calculus 1 (MATH101 - تفاضل وتكامل 1) with videos, files, and past year questions.
     */
    public function run(): void
    {
        $course = Course::where('course_code', 'MATH101')->first();
        if (! $course) {
            return;
        }

        $this->seedVideos($course);
        $this->seedFiles($course);
        $this->seedPastYearQuestions($course);
    }

    private function seedVideos(Course $course): void
    {
        $videos = [
            [
                'title' => 'Professor Leonard - Calculus 1 Full Course',
                'url' => 'https://www.youtube.com/playlist?list=PLs4zVChqHxreUhBjvSY5qQ45UXq8msrwd',
            ],
            [
                'title' => '3Blue1Brown - Essence of Calculus',
                'url' => 'https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr',
            ],
            [
                'title' => 'Khan Academy - Calculus 1',
                'url' => 'https://www.khanacademy.org/math/calculus-1',
            ],
            [
                'title' => 'The Organic Chemistry Tutor - Calculus 1',
                'url' => 'https://www.youtube.com/playlist?list=PL0o_zxa4K1BWYThyV4T2Allw6zY0jEumv',
            ],
        ];

        foreach ($videos as $video) {
            $course->videos()->firstOrCreate(
                ['url' => $video['url']],
                ['title' => $video['title']]
            );
        }
    }

    private function seedFiles(Course $course): void
    {
        $files = [
            [
                'title' => 'الكتاب - OpenStax Calculus Volume 1',
                'url' => 'https://openstax.org/details/books/calculus-volume-1',
            ],
            [
                'title' => 'MIT 18.01 Single Variable Calculus',
                'url' => 'https://ocw.mit.edu/courses/18-01-single-variable-calculus-fall-2006/',
            ],
            [
                'title' => 'Paul\'s Online Math Notes - Calculus I',
                'url' => 'https://tutorial.math.lamar.edu/Classes/CalcI/CalcI.aspx',
            ],
            [
                'title' => 'MIT 18.01 Lecture Notes',
                'url' => 'https://ocw.mit.edu/courses/18-01-single-variable-calculus-fall-2006/pages/lecture-notes/',
            ],
            [
                'title' => 'UBC CLP Calculus - Differential Calculus',
                'url' => 'https://www.math.ubc.ca/~CLP/CLP1/',
            ],
            [
                'title' => 'Khan Academy Calculus 1 Materials',
                'url' => 'https://www.khanacademy.org/math/calculus-1',
            ],
        ];

        foreach ($files as $file) {
            $course->files()->firstOrCreate(
                ['url' => $file['url']],
                ['title' => $file['title']]
            );
        }
    }

    private function seedPastYearQuestions(Course $course): void
    {
        $baseUrl = 'https://ocw.mit.edu/courses/18-01-single-variable-calculus-fall-2006/resources/';

        $questions = [
            ['name' => 'first', 'url' => $baseUrl.'exam1/'],
            ['name' => 'second', 'url' => $baseUrl.'exam2/'],
            ['name' => 'mid', 'url' => $baseUrl.'prexam1b/'],
            ['name' => 'final', 'url' => $baseUrl.'exam4/'],
            ['name' => 'quizzes', 'url' => $baseUrl.'prexam2a/'],
            ['name' => 'comprehensive', 'url' => $baseUrl.'prfinal/'],
        ];

        foreach ($questions as $q) {
            $course->pastYearQuestions()->firstOrCreate(
                ['url' => $q['url']],
                ['name' => $q['name']]
            );
        }
    }
}
