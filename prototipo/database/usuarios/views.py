from django.shortcuts import render
from .forms import CadastroForm

def cadastro(request):
    if request.method == 'POST':
        form = CadastroForm(request.POST)
        if form.is_valid():
            # Simplesmente exibe uma mensagem para teste
            return render(request, 'usuarios/sucesso.html', {'nome': form.cleaned_data['first_name']})
    else:
        form = CadastroForm()
    return render(request, 'usuarios/cadastro.html', {'form': form})
