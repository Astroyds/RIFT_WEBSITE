window.RIFT_DATA = {
  install: {
    installCmd: 'curl -fsSL https://rift.astroyds.com/rift/install.sh  | sh',
    uninstallCmd: 'curl -fsSL https://rift.astroyds.com/rift/uninstall.sh  | sh'
  },
  compare: {
    tasks: [
      {
        id: 'hello',
        name: 'Hello output',
        description: 'Print a greeting string.'
      },
      {
        id: 'sum',
        name: 'Sum an array',
        description: 'Accumulate numeric values from a list.'
      },
      {
        id: 'class',
        name: 'Simple model',
        description: 'Define a person model with a greet method.'
      }
    ],
    languages: [
      'RIFT','Python','JavaScript','TypeScript','Go','Rust','Java','C#','C++','C','Kotlin','Swift','Ruby','PHP','Elixir','Haskell','Lua','Dart','Scala','Zig'
    ],
    snippets: {
      hello: {
        RIFT: 'conduit main() @\n    print("Hello, World!")\n#',
        Python: 'def main():\n    print("Hello, World!")',
        JavaScript: 'function main() {\n  console.log("Hello, World!");\n}',
        TypeScript: 'function main(): void {\n  console.log("Hello, World!");\n}',
        Go: 'package main\nimport "fmt"\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
        Rust: 'fn main() {\n    println!("Hello, World!");\n}',
        Java: 'class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}',
        'C#': 'class Program {\n  static void Main() {\n    Console.WriteLine("Hello, World!");\n  }\n}',
        'C++': '#include <iostream>\nint main() {\n  std::cout << "Hello, World!" << std::endl;\n}',
        C: '#include <stdio.h>\nint main(void) {\n  printf("Hello, World!\\n");\n}',
        Kotlin: 'fun main() {\n  println("Hello, World!")\n}',
        Swift: 'print("Hello, World!")',
        Ruby: 'puts "Hello, World!"',
        PHP: '<?php\necho "Hello, World!";',
        Elixir: 'IO.puts("Hello, World!")',
        Haskell: 'main = putStrLn "Hello, World!"',
        Lua: 'print("Hello, World!")',
        Dart: 'void main() {\n  print("Hello, World!");\n}',
        Scala: 'object Main extends App {\n  println("Hello, World!")\n}',
        Zig: 'const std = @import("std");\npub fn main() !void {\n    std.debug.print("Hello, World!\\n", .{});\n}'
      },
      sum: {
        RIFT: 'conduit sum(...numbers) @\n    mut total = 0\n    repeat n in numbers @\n        total += n\n    #\n    give total\n#',
        Python: 'def sum_numbers(numbers):\n    total = 0\n    for n in numbers:\n        total += n\n    return total',
        JavaScript: 'function sumNumbers(numbers) {\n  let total = 0;\n  for (const n of numbers) total += n;\n  return total;\n}',
        TypeScript: 'function sumNumbers(numbers: number[]): number {\n  let total = 0;\n  for (const n of numbers) total += n;\n  return total;\n}',
        Go: 'func sumNumbers(numbers []int) int {\n    total := 0\n    for _, n := range numbers {\n        total += n\n    }\n    return total\n}',
        Rust: 'fn sum_numbers(numbers: &[i32]) -> i32 {\n    let mut total = 0;\n    for n in numbers {\n        total += n;\n    }\n    total\n}',
        Java: 'static int sumNumbers(int[] numbers) {\n  int total = 0;\n  for (int n : numbers) total += n;\n  return total;\n}',
        'C#': 'static int SumNumbers(int[] numbers) {\n  var total = 0;\n  foreach (var n in numbers) total += n;\n  return total;\n}',
        'C++': 'int sumNumbers(const vector<int>& numbers) {\n  int total = 0;\n  for (int n : numbers) total += n;\n  return total;\n}',
        C: 'int sum_numbers(int* numbers, int len) {\n  int total = 0;\n  for (int i = 0; i < len; i++) total += numbers[i];\n  return total;\n}',
        Kotlin: 'fun sumNumbers(numbers: List<Int>): Int {\n  var total = 0\n  for (n in numbers) total += n\n  return total\n}',
        Swift: 'func sumNumbers(_ numbers: [Int]) -> Int {\n  var total = 0\n  for n in numbers { total += n }\n  return total\n}',
        Ruby: 'def sum_numbers(numbers)\n  total = 0\n  numbers.each { |n| total += n }\n  total\nend',
        PHP: 'function sumNumbers(array $numbers): int {\n  $total = 0;\n  foreach ($numbers as $n) $total += $n;\n  return $total;\n}',
        Elixir: 'def sum_numbers(numbers) do\n  Enum.reduce(numbers, 0, fn n, acc -> n + acc end)\nend',
        Haskell: 'sumNumbers numbers = foldl (+) 0 numbers',
        Lua: 'function sumNumbers(numbers)\n  local total = 0\n  for _, n in ipairs(numbers) do total = total + n end\n  return total\nend',
        Dart: 'int sumNumbers(List<int> numbers) {\n  var total = 0;\n  for (final n in numbers) total += n;\n  return total;\n}',
        Scala: 'def sumNumbers(numbers: List[Int]): Int = {\n  var total = 0\n  numbers.foreach(n => total += n)\n  total\n}',
        Zig: 'fn sumNumbers(numbers: []const i32) i32 {\n    var total: i32 = 0;\n    for (numbers) |n| total += n;\n    return total;\n}'
      },
      class: {
        RIFT: 'make Person @\n    conduit init(name, age) @\n        me.name = name\n        me.age = age\n    #\n\n    conduit greet() @\n        give `Hello, I am $@me.name#!`\n    #\n#',
        Python: 'class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\n    def greet(self):\n        return f"Hello, I am {self.name}"',
        JavaScript: 'class Person {\n  constructor(name, age) {\n    this.name = name;\n    this.age = age;\n  }\n\n  greet() {\n    return `Hello, I am ${this.name}`;\n  }\n}',
        TypeScript: 'class Person {\n  constructor(public name: string, public age: number) {}\n  greet(): string {\n    return `Hello, I am ${this.name}`;\n  }\n}',
        Go: 'type Person struct {\n    Name string\n    Age int\n}\nfunc (p Person) Greet() string {\n    return "Hello, I am " + p.Name\n}',
        Rust: 'struct Person {\n    name: String,\n    age: i32,\n}\nimpl Person {\n    fn greet(&self) -> String {\n        format!("Hello, I am {}", self.name)\n    }\n}',
        Java: 'class Person {\n  private String name;\n  private int age;\n\n  Person(String name, int age) {\n    this.name = name;\n    this.age = age;\n  }\n\n  String greet() {\n    return "Hello, I am " + name;\n  }\n}',
        'C#': 'class Person {\n  public string Name { get; }\n  public int Age { get; }\n  public Person(string name, int age) { Name = name; Age = age; }\n  public string Greet() => $"Hello, I am {Name}";\n}',
        'C++': 'class Person {\n  string name; int age;\npublic:\n  Person(string n, int a): name(n), age(a) {}\n  string greet() const { return "Hello, I am " + name; }\n};',
        C: 'typedef struct {\n  char name[64];\n  int age;\n} Person;\nconst char* greet(Person* p) { return "Hello"; }',
        Kotlin: 'class Person(private val name: String, private val age: Int) {\n  fun greet(): String = "Hello, I am $name"\n}',
        Swift: 'struct Person {\n  let name: String\n  let age: Int\n  func greet() -> String { "Hello, I am \\(name)" }\n}',
        Ruby: 'class Person\n  def initialize(name, age)\n    @name = name\n    @age = age\n  end\n  def greet\n    "Hello, I am #{@name}"\n  end\nend',
        PHP: 'class Person {\n  public function __construct(private string $name, private int $age) {}\n  public function greet(): string {\n    return "Hello, I am {$this->name}";\n  }\n}',
        Elixir: 'defmodule Person do\n  defstruct [:name, :age]\n  def greet(%Person{name: name}), do: "Hello, I am #{name}"\nend',
        Haskell: 'data Person = Person { name :: String, age :: Int }\ngreet p = "Hello, I am " ++ name p',
        Lua: 'Person = {}\nfunction Person:new(name, age)\n  local o = {name = name, age = age}\n  setmetatable(o, self); self.__index = self\n  return o\nend\nfunction Person:greet() return "Hello, I am " .. self.name end',
        Dart: 'class Person {\n  final String name;\n  final int age;\n  Person(this.name, this.age);\n  String greet() => "Hello, I am $name";\n}',
        Scala: 'case class Person(name: String, age: Int) {\n  def greet: String = s"Hello, I am $name"\n}',
        Zig: 'const Person = struct {\n    name: []const u8,\n    age: i32,\n    pub fn greet(self: Person) []const u8 {\n        return "Hello";\n    }\n};'
      }
    }
  }
};
