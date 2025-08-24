import random
from datetime import date, timedelta

# Seed for reproducibility
random.seed(42)

# Predefined options
designs = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta", 
           "Iota", "Kappa", "Lambda", "Mu", "Nu", "Xi", "Omicron", "Pi", "Rho", 
           "Sigma", "Tau", "Upsilon", "Phi", "Chi", "Psi", "Omega"]
colors = ["Red", "Blue", "Green", "Yellow", "Black", "White", "Purple", 
          "Orange", "Grey", "Pink", "Brown", "Cyan", "Magenta"]
manufacturers = ["Acme Co.", "Globex", "Umbrella Corp", "Initech", "Soylent", 
                 "Stark Industries", "Wayne Enterprises", "Oscorp", 
                 "Cyberdyne Systems", "Tyrell Corp"]
notes_options = [None, "Back stock", "Minor scratches", "Surface wear", 
                 "Prototype test", "Test unit", "Check gear teeth", "Replacement due"]


types = ["PAINT", "FLAT", "NON_FLAT"]
conditions = ["NEW", "USED", "DAMAGED"]

# Settings for generation
start_sleeve = 3000
count = 50
mfg_min = date(2022, 1, 1)
mfg_max = date(2025, 4, 30)
last_max = date(2025, 5, 15)

# Generate values
values = []
for i in range(count):
    seq = random.choice([1001, 1002, 1003, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011])
    sn = start_sleeve + i
    design = random.choice(designs)
    color = random.choice(colors)
    manufacturer = random.choice(manufacturers)
    note = random.choice(notes_options)
    gear = random.randint(3, 10)
    circ = random.randint(200, 300)
    slot = random.randint(1, 10)
    mfg_date = mfg_min + timedelta(days=random.randint(0, (mfg_max - mfg_min).days))
    km = random.randint(0, 5000)
    wh = (i % 3) + 1
    type_ = random.choice(types)
    cond = random.choice(conditions)
    width = random.randint(40, 60)

    note_str = f"'{note}'" if note is not None else "NULL"
    line = (
        f"  ({seq}, {sn}, '{design}', '{color}', '{manufacturer}', {note_str}, "
        f"{gear}, {circ}, {slot}, '{mfg_date}', {width}, {km}, "
        f"{wh},'{type_}', '{cond}')"
    )
    values.append(line)

# Print multi-row INSERT
print("INSERT INTO sleeves (")
print("  sequence_number, sleeve_number, design, color, manufacturer, notes, gear, circumference, slot,")
print("  manufacture_date, width, km_stand, warehouse_id, \"type\", \"condition\"")
print(") VALUES")
print(",\n".join(values) + ";")
