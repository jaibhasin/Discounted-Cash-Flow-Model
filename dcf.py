def calculate_dcf():
    print("=== DCF Calculator using Owner Earnings ===\n")
    try:
        current_earnings = float(input("Enter current year owner earnings (₹): "))
        discount_rate = float(input("Enter discount rate (r) as decimal (e.g., 0.10 for 10%): "))
        growth_rate = float(input("Enter growth rate (g) for first 5 years as decimal (e.g., 0.08 for 8%): "))
        terminal_growth = float(input("Enter terminal growth rate (g_terminal) as decimal (e.g., 0.03 for 3%): "))
        if discount_rate <= terminal_growth:
            print("Error: Discount rate must be greater than terminal growth rate")
            return
        print(f"\n=== DCF Calculation ===")
        print(f"Current Owner Earnings: ₹{current_earnings:,.2f}")
        print(f"Discount Rate: {discount_rate:.2%}")
        print(f"Growth Rate (Years 1-5): {growth_rate:.2%}")
        print(f"Terminal Growth Rate: {terminal_growth:.2%}")
    except ValueError:
        print("Error: Please enter valid numbers")
        return
    print(f"\n=== Projected Owner Earnings (Next 5 Years) ===")
    projected_earnings = []
    present_values = []
    for year in range(1, 6):
        future_earnings = current_earnings * ((1 + growth_rate) ** year)
        projected_earnings.append(future_earnings)
        present_value = future_earnings / ((1 + discount_rate) ** year)
        present_values.append(present_value)
        print(f"Year {year}: ₹{future_earnings:,.2f} | PV: ₹{present_value:,.2f}")
    print(f"\n=== Terminal Value Calculation ===")
    year_5_earnings = projected_earnings[4]
    year_6_earnings = year_5_earnings * (1 + terminal_growth)
    terminal_value = year_6_earnings / (discount_rate - terminal_growth)
    pv_terminal_value = terminal_value / ((1 + discount_rate) ** 5)
    print(f"Year 6 projected earnings: ₹{year_6_earnings:,.2f}")
    print(f"Terminal Value: ₹{terminal_value:,.2f}")
    print(f"PV of Terminal Value: ₹{pv_terminal_value:,.2f}")
    print(f"\n=== DCF Summary ===")
    total_pv_5years = sum(present_values)
    total_dcf_value = total_pv_5years + pv_terminal_value
    print(f"PV of 5-Year Cash Flows: ₹{total_pv_5years:,.2f}")
    print(f"PV of Terminal Value: ₹{pv_terminal_value:,.2f}")
    print(f"Total DCF Value: ₹{total_dcf_value:,.2f}")
    print(f"\n=== Value Breakdown ===")
    print(f"5-Year Period: {(total_pv_5years/total_dcf_value)*100:.1f}% of total value")
    print(f"Terminal Value: {(pv_terminal_value/total_dcf_value)*100:.1f}% of total value")

def main():
    while True:
        calculate_dcf()
        choice = input("\nWould you like to calculate another DCF? (y/n): ").lower()
        if choice != 'y':
            print("Thank you for using the DCF Calculator!")
            break
        print("\n" + "="*50 + "\n")

if __name__ == "__main__":
    main()