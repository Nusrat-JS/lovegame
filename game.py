import turtle
import time
import random
from datetime import datetime

# Configuration
BIRTHDAY_MONTH = 8
BIRTHDAY_DAY = 10
GF_NAME = "Brownie" # User can change this
LOVE_MESSAGE = "I love you more than words can say. Happy Birthday, My Love!"

def check_birthday():
    today = datetime.now()
    if today.month == BIRTHDAY_MONTH and today.day == BIRTHDAY_DAY:
        return True
    return False

def draw_heart(t, x, y, size, color):
    t.penup()
    t.goto(x, y)
    t.pendown()
    t.fillcolor(color)
    t.begin_fill()
    t.left(140)
    t.forward(size)
    for _ in range(200):
        t.right(1)
        t.forward(size * 0.0035)
    t.left(120)
    for _ in range(200):
        t.right(1)
        t.forward(size * 0.0035)
    t.forward(size)
    t.end_fill()
    t.setheading(0)

def setup_game():
    screen = turtle.Screen()
    screen.title("A Special Birthday Quest for You ❤️")
    screen.bgcolor("#f5d1e2")
    screen.setup(width=800, height=600)
    
    player = turtle.Turtle()
    player.shape("turtle")
    player.color("#f0478a")
    player.penup()
    player.speed(0)
    
    return screen, player

def start_game():
    screen, player = setup_game()
    
    # Message at the start
    msg_writer = turtle.Turtle()
    msg_writer.hideturtle()
    msg_writer.penup()
    msg_writer.goto(0, 200)
    msg_writer.color("#880145")
    
    if not check_birthday():
        msg_writer.write("Wait! It's not August 10th yet, are you missing me? \nBut since you're special, I'll let you play! 😉", 
                         align="center", font=("Arial", 16, "bold"))
        time.sleep(8)
        msg_writer.clear()

    msg_writer.write("Collect all 5 hearts to reveal your surprise!", align="center", font=("Arial", 18, "bold"))
    
    # Game variables
    hearts = []
    for _ in range(5):
        h = turtle.Turtle()
        h.shape("circle")
        h.color("red")
        h.penup()
        h.speed(0)
        h.goto(random.randint(-350, 350), random.randint(-250, 150))
        hearts.append(h)
    
    score = 0
    
    # Movement functions
    def move_up(): player.setheading(90); player.forward(20)
    def move_down(): player.setheading(270); player.forward(20)
    def move_left(): player.setheading(180); player.forward(20)
    def move_right(): player.setheading(0); player.forward(20)
    
    screen.listen()
    screen.onkey(move_up, "Up")
    screen.onkey(move_down, "Down")
    screen.onkey(move_left, "Left")
    screen.onkey(move_right, "Right")
    
    # Game loop
    while score < 5:
        screen.update()
        for h in hearts:
            if player.distance(h) < 20:
                h.hideturtle()
                hearts.remove(h)
                score += 1
                msg_writer.clear()
                msg_writer.write(f"Hearts Collected: {score}/5", align="center", font=("Arial", 18, "bold"))
        time.sleep(0.01)
    
    # Final Reveal
    msg_writer.clear()
    player.hideturtle()
    screen.bgcolor("#ffccd5")
    
    # Draw a big heart
    heart_painter = turtle.Turtle()
    heart_painter.hideturtle()
    heart_painter.speed(0)
    draw_heart(heart_painter, 0, -50, 300, "#e44182")
    
    # Final Message
    msg_writer.goto(0, 0)
    msg_writer.color("white")
    msg_writer.write("HAPPY BIRTHDAY!", align="center", font=("Verdana", 30, "bold"))
    
    msg_writer.goto(0, -250)
    msg_writer.color("#9c0551")
    msg_writer.write(LOVE_MESSAGE, align="center", font=("Arial", 14, "italic"))
    
    # Confetti effect
    confetti = []
    for _ in range(30):
        c = turtle.Turtle()
        c.shape("circle")
        c.shapesize(0.4)
        c.color(random.choice(["#ff99cc", "#f550f5", "#f3f386", "#ccffff"]))
        c.penup()
        c.goto(random.randint(-400, 400), random.randint(300, 400))
        confetti.append(c)
        
        
    for _ in range(100):
        for c in confetti:
            c.sety(c.ycor() - random.randint(5, 15))
            if c.ycor() < -300:
                c.goto(random.randint(-400, 400), 300)
        screen.update()
        time.sleep(0.05)

    screen.mainloop()

if __name__ == "__main__":
    start_game()
    