# Belly Button Biodiversity

## Overview

**Link:** https://dhanushree27.github.io/Belly-Button-Biodiversity/

![image](https://user-images.githubusercontent.com/90650562/151721800-04cd8643-bba6-416b-a46c-6a439af78788.png)

This project was undertaken in partnership with Improbable Beef to identify a bacterial strain that can synthesize proteins that taste like Beef. The hypothesis is that it can be found in the human body, particulary the belly button. Samples were collected from 153 candidates and studied to identify the bacterial strains available. A dashboard was developed using Javascript and HTML/CSS to display the results of the study. The charts were generated and customized using D3 and Plotly. The dashboard contains the following components:

- A dropdown with the list of candidates. Based on the selection, the below components dynamically change
    - A info box with the details of the candidate
    - A bar chart with the top 10 bacterial strains in the candidates belly
    
   ![image](https://user-images.githubusercontent.com/90650562/151721772-8e1afa4f-3591-4658-91e2-789311f3b848.png)

    - A gauge chart with the belly button washing frequency at the rate of washes per week of the candidate

    ![image](https://user-images.githubusercontent.com/90650562/151721787-08b7db00-47e7-4a81-bc5c-df00bc9079cc.png)

    - A bubble chart displaying all the bacterial strains found in the candidate, with the size reprensenting the quantiy of the bacteria and color representing the strain's ID
    
    ![image](https://user-images.githubusercontent.com/90650562/151721510-84bb8e40-cfd4-4abe-bd20-e1196c445262.png)

- A navbar to navigate between the bar chart and bubble chart is also available at the top

The dashboard utilizes bootstrap 3.3.7. 

## Customizations:
- Mobile responsive
- Addition of navigation bar
- Customized the OTU label for better readability
- Addition of jumbotron image
- Color scheme customization
- Addition of a brief description
